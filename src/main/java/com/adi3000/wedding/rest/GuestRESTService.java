package com.adi3000.wedding.rest;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import com.adi3000.wedding.common.database.data.GuestType;
import com.adi3000.wedding.common.database.data.guest.Guest;
import com.adi3000.wedding.common.database.data.guest.GuestService;
import com.adi3000.wedding.common.database.data.qrcode.QrCode;
import com.adi3000.wedding.common.database.data.qrcode.QrCodeService;

@Path("/guests")
@Provider
@Produces(MediaType.APPLICATION_JSON)
@WebService(name="GuestREST")
public class GuestRESTService extends SpringBeanAutowiringSupport {
	
	private GuestService guestService;
	private QrCodeService qrCodeService;
	/**
	 * @param qrCodeService the qrCodeService to set
	 */
	@Inject
	public void setQrCodeService(QrCodeService qrCodeService) {
		this.qrCodeService = qrCodeService;
	}
	/**
	 * @param guestService the guestService to set
	 */
	@Inject
	public void setGuestService(GuestService guestService) {
		this.guestService = guestService;
	}

	@GET
	@WebMethod
	public GenericEntity<List<Guest>> getGuests (
				@QueryParam("t") String type,
				@QueryParam("q") String qrCodeHash
			){
		List<Guest> guests = null;
		if(StringUtils.isNumeric(type)){
			if(Integer.valueOf(type).intValue() == GuestType.BEST_MAN.getValue()){
				guests = guestService.getAllBestMen();
			}else{
				guests = guestService.getAll();
			}
		}else{
			if(StringUtils.isNotEmpty(qrCodeHash)){
				QrCode qrCode = qrCodeService.getByHash(qrCodeHash);
				if(qrCode == null){
					guests = new ArrayList<>(0);
				}else{
					guests = new ArrayList<>(qrCode.getGuests());
				}
			}else{
				guests = guestService.getAll();
			}
		}
		return new GenericEntity<List<Guest>>(guests) {};
	}
	
	@GET
	@Path("{id}")
	public GenericEntity<Guest> getGuestById(@PathParam("id") Integer id){
		return new GenericEntity<Guest>(guestService.get(id)) {};
	}
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public GenericEntity<Guest> update(Guest guest){
		return new GenericEntity<Guest>(guestService.update(guest)) {};
	}
	
	@GET
	@Path("qrCode/{hash}")
	public Response getGuestById(@PathParam("hash") String hash){
		QrCode qrCode = qrCodeService.getByHash(hash);
		if(qrCode == null || CollectionUtils.isEmpty(qrCode.getGuests())){
			return Response.status(404).entity(qrCode).build();
		}
		return Response.status(200).entity(new GenericEntity<QrCode>(qrCode){}).build();
	}
	
	@POST
	@Path("qrCode/{hash}")
	public Response saveAnswer(@PathParam("hash") String hash, QrCode request){
		return Response.status(200).entity(new GenericEntity<QrCode>(guestService.updateAnswerFromQrCode(request)){}).build();
	}
	
	

}
