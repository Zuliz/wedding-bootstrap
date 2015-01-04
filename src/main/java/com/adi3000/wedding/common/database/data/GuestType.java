package com.adi3000.wedding.common.database.data;

public enum GuestType {

	GUEST(0),
	BEST_MAN(1);
	
	private final int value;
	private GuestType(int value){
		this.value = value;
	}
	
	public static GuestType get(int type){
	    for (GuestType e : values()) {
	        if (e.value == type) {
	            return e;
	        }
	    }
	    return null;
	}
	
	public int getValue(){
		return this.value;
	}
}
