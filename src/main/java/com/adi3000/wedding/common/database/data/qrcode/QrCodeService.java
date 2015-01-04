package com.adi3000.wedding.common.database.data.qrcode;

import com.adi3000.common.database.hibernate.session.DAO;

public interface QrCodeService extends DAO<QrCode> {
	public QrCode getByHash(String hash);
}
