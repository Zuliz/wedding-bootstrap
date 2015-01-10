package com.adi3000.wedding.common.database.data.guest;

import java.lang.reflect.InvocationTargetException;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import org.apache.commons.beanutils.BeanUtils;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.adi3000.common.database.hibernate.DatabaseOperation;
import com.adi3000.common.database.hibernate.session.AbstractDAO;
import com.adi3000.common.database.spring.TransactionalReadOnly;
import com.adi3000.common.database.spring.TransactionalUpdate;
import com.adi3000.wedding.common.database.data.GuestType;
import com.adi3000.wedding.common.database.data.privacy.PrivacyAttribute;
import com.adi3000.wedding.common.database.data.qrcode.QrCode;
import com.adi3000.wedding.common.database.data.qrcode.QrCodeService;

@Service
public class GuestServiceImpl extends AbstractDAO<Guest> implements GuestService{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1962887611960545844L;
	private static final Logger LOGGER = LoggerFactory.getLogger(GuestServiceImpl.class.getName());
	private transient QrCodeService qrCodeService;
	
	/**
	 * @param qrCodeService the qrCodeService to set
	 */
	@Inject
	public void setQrCodeService(QrCodeService qrCodeService) {
		this.qrCodeService = qrCodeService;
	}

	public GuestServiceImpl() {
		super(Guest.class);
	}
	
	@TransactionalReadOnly
	public List<Guest> getAll(){
		@SuppressWarnings("unchecked")
		List<Guest> guests = createCriteria(Guest.class).list();
		if(guests != null){
			for(Guest guest : guests){
				sanitizeGuest(guest);
			}
		}
		return guests;
	}
	
	@TransactionalReadOnly
	public List<Guest> getAllBestMen(){
		@SuppressWarnings("unchecked")
		List<Guest> guests = super.getSession().createCriteria(Guest.class)
				.add(Restrictions.eq("typeId", GuestType.BEST_MAN.getValue()))
				.list();
		if(guests != null){
			for(Guest guest : guests){
				sanitizeGuest(guest);
			}
		}
		return guests;
	}
	
	private Guest sanitizeGuest(Guest guest){
		if(guest.getPrivacy() != null){
			for(PrivacyAttribute attribute : guest.getPrivacy()){
				if(attribute.isHidden()){
					try {
						BeanUtils.setProperty(guest, attribute.getAttribute(), null);
					} catch (IllegalAccessException | InvocationTargetException e) {
						LOGGER.error(String.format("Attribute '%s' cannot be set to null for %s" ,e));
					}
				}
			}
		}
		return guest;
	}
	
	@TransactionalUpdate
	public Guest save(Guest guest){
		guest.setDatabaseOperation(DatabaseOperation.INSERT);
		modify(guest);
		return guest;
	}
	@TransactionalUpdate
	public Guest update(Guest guest){
		guest.setDatabaseOperation(DatabaseOperation.UPDATE);
		modify(guest);
		return guest;
	}
	
	@TransactionalUpdate
	public QrCode updateAnswerFromQrCode(QrCode request){
		QrCode qrCode = qrCodeService.get(request.getId());
		int updates = 0;
		for(Guest guest : qrCode.getGuests()){
			for(Guest guestRequest : request.getGuests()){
				if(guest.equals(guestRequest)){
					updateAnswerFromQrCode(guest, guestRequest.getAnswerId());
					updates ++;
					break;
				}
			}
		}
		return qrCode;
	}

	private void updateAnswerFromQrCode(Guest guest, Integer answer) {
		if(answer != null && ! answer.equals(guest.getAnswerId())){
			guest.setAnswerId(answer);
			guest.setLastUpdate(new Date());
			guest.setDatabaseOperation(DatabaseOperation.UPDATE);
			save(guest);
		}
	}

}

