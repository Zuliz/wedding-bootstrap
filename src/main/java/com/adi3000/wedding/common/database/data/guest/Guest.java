package com.adi3000.wedding.common.database.data.guest;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.adi3000.common.database.hibernate.data.AbstractDataObject;
import com.adi3000.wedding.common.database.data.privacy.PrivacyAttribute;

@Entity
@Table(name="guests")
public class Guest extends AbstractDataObject{

	/**
	 * 
	 */
	private static final long serialVersionUID = 5226171422659332802L;
	private Integer id;
	private String firstName;
	private String lastName;
	private String phone;
	private String mail;
	private String address;
	private Integer answerId;
	private Integer typeId;
	private Set<PrivacyAttribute> privacy;

	@Override
	@Id
	@Column(name="guest_id")
	public Integer getId() {
		return id;
	}

	/**
	 * @return the firstName
	 */
	@Column(name="guest_first_name")
	public String getFirstName() {
		return firstName;
	}

	/**
	 * @param firstName the firstName to set
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	/**
	 * @return the lastName
	 */
	@Column(name="guest_last_name")
	public String getLastName() {
		return lastName;
	}

	/**
	 * @param lastName the lastName to set
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	/**
	 * @return the phone
	 */
	@Column(name="guest_phone")
	public String getPhone() {
		return phone;
	}

	/**
	 * @param phone the phone to set
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}

	/**
	 * @return the mail
	 */
	@Column(name="guest_mail")
	public String getMail() {
		return mail;
	}

	/**
	 * @param mail the mail to set
	 */
	public void setMail(String mail) {
		this.mail = mail;
	}

	/**
	 * @return the answerId
	 */
	@Column(name="guest_answer")
	public Integer getAnswerId() {
		return answerId;
	}

	/**
	 * @param answerId the answerId to set
	 */
	public void setAnswerId(Integer answerId) {
		this.answerId = answerId;
	}

	/**
	 * @return the typeId
	 */
	@Column(name="guest_type")
	public Integer getTypeId() {
		return typeId;
	}

	/**
	 * @param typeId the typeId to set
	 */
	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}

	/**
	 * @return the privacy
	 */
	@OneToMany
	@JoinColumn(name="guest_id")
	public Set<PrivacyAttribute> getPrivacy() {
		return privacy;
	}

	/**
	 * @param privacy the privacy to set
	 */
	public void setPrivacy(Set<PrivacyAttribute> privacy) {
		this.privacy = privacy;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * @return the address
	 */
	@Column(name="guest_address")
	public String getAddress() {
		return address;
	}

	/**
	 * @param address the address to set
	 */
	public void setAddress(String address) {
		this.address = address;
	}

}
