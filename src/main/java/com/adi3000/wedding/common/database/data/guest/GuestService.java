package com.adi3000.wedding.common.database.data.guest;

import java.util.List;

import com.adi3000.common.database.hibernate.session.DAO;


public interface GuestService extends DAO<Guest> {
	public List<Guest> getAllBestMen();
	public List<Guest> getAll();
	public Guest save(Guest guest);
	public Guest update(Guest guest);
	
}
