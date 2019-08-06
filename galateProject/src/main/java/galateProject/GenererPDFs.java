package galateProject;

import javax.ws.rs.core.*;
import java.io.*;
import javax.ws.rs.*;
import java.util.*;
import java.text.*;

@Path("/galate")
public class GenererPDFs
{
    @GET
    @Path("/generateReportEtalonnage")
    @Produces({ "application/octet-stream" })
    public Response generateReportEtalonnage(@QueryParam("testId") final Long testId) {
        final UUID uuid = UUID.randomUUID();
        GeneratePdfEtalonnage.genererPdfEtalonnage(testId, uuid);
        try {
            final File file = new File(String.valueOf(System.getProperty("java.io.tmpdir")) + "//" + uuid + "//etalonnage.pdf");
            final FileInputStream inputStream = new FileInputStream(file);
            final Response.ResponseBuilder response = Response.ok((Object)file);
            response.header("Content-Disposition", (Object)"attachment; filename=Report.pdf");
            return response.build();
        }
        catch (Exception e) {
            System.out.println("could not download specified file");
            return null;
        }
    }
    
    @GET
    @Path("/generateReportAutodiagnostic")
    @Produces({ "application/octet-stream" })
    public Response generateReportAutodiagnostic(@QueryParam("testId") final Long testId, @QueryParam("memberId") final Long memberId) {
        final UUID uuid = UUID.randomUUID();
        GeneratePdfAutodiagnostic.generatePdfAutodiagnostic(testId, uuid, memberId);
        try {
            final Date aujourdhui = new Date();
            final DateFormat date = DateFormat.getDateTimeInstance(2, 2);
            final String dateD = date.format(aujourdhui);
            final File file = new File(String.valueOf(System.getProperty("java.io.tmpdir")) + "//" + uuid + "//resultat.pdf");
            System.out.println(file.getAbsolutePath());
            final FileInputStream inputStream = new FileInputStream(file);
            final Response.ResponseBuilder response = Response.ok((Object)file);
            response.header("Content-Disposition", (Object)"attachment; filename=resultatsPA.pdf");
            return response.build();
        }
        catch (Exception e) {
            System.out.println("could not download specified file");
            return null;
        }
    }
}