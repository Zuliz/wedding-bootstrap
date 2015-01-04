package com.adi3000.wedding.common.database.data.guest;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

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

@Service
public class GuestServiceImpl extends AbstractDAO<Guest> implements GuestService{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1962887611960545844L;
	private static final Logger LOGGER = LoggerFactory.getLogger(GuestServiceImpl.class.getName());

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
		List<Guest> guests = super.getSession().createCriteria(getClass())
				.add(Restrictions.eq("type", GuestType.BEST_MAN.getValue()))
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

}

