package com.adi3000.wedding.common.database.data.qrcode;

import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.adi3000.common.database.hibernate.session.AbstractDAO;
import com.adi3000.common.database.spring.TransactionalReadOnly;

@Service
public class QrCodeServiceImpl extends AbstractDAO<QrCode> implements QrCodeService{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3260520759399567497L;

	public QrCodeServiceImpl() {
		super(QrCode.class);
	}
	@TransactionalReadOnly
	public QrCode getByHash(String hash){
		return (QrCode) createCriteria(QrCode.class).add(Restrictions.eq("hash", hash)).uniqueResult();
	}
}
