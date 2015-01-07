package com.adi3000.wedding.common.database.data.privacy;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Type;

import com.adi3000.common.database.hibernate.data.AbstractDataObject;

@Entity
@Table(name="privacies")
public class PrivacyAttribute extends AbstractDataObject{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8034178507044976168L;
	private Integer id;
	private String attribute;
	private Boolean hidden;
	/**
	 * @return the id
	 */
	@Id
	@Column(name="privacy_id")
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
	 * @return the attribute
	 */
	@Column(name="privacy_attribute")
	public String getAttribute() {
		return attribute;
	}
	/**
	 * @param attribute the attribute to set
	 */
	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}
	/**
	 * @return the hidden
	 */
	@Column(name="privacy_hidden")
	@Type(type = "numeric_boolean")
	public Boolean getHidden() {
		return hidden;
	}
	/**
	 * @param hidden the hidden to set
	 */
	public void setHidden(Boolean hidden) {
		this.hidden = hidden;
	}
	
	@Transient
	public boolean isHidden(){
		return hidden != null && hidden.booleanValue();
	}
	
}
