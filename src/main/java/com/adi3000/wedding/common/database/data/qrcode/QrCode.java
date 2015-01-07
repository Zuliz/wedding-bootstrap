package com.adi3000.wedding.common.database.data.qrcode;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.adi3000.common.database.hibernate.data.AbstractDataObject;
import com.adi3000.wedding.common.database.data.guest.Guest;

@Entity
@Table(name="qr_codes")
public class QrCode extends AbstractDataObject{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 7341838110057642396L;
	private Integer id;
	private String hash;
	private String description;
	private Set<Guest> guests;
	
	/**
	 * @return the id
	 */
	@Id
	@Column(name="qr_id")
	public Integer getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * @return the hash
	 */
	@Column(name="qr_hash")
	public String getHash() {
		return hash;
	}
	/**
	 * @param hash the hash to set
	 */
	public void setHash(String hash) {
		this.hash = hash;
	}
	/**
	 * @return the description
	 */
	@Column(name="qr_description")
	public String getDescription() {
		return description;
	}
	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}
	/**
	 * @return the guests
	 */
	@OneToMany(fetch=FetchType.EAGER)
	@JoinColumn(name="qr_id")
	public Set<Guest> getGuests() {
		return guests;
	}
	/**
	 * @param guests the guests to set
	 */
	public void setGuests(Set<Guest> guests) {
		this.guests = guests;
	}
	

}
