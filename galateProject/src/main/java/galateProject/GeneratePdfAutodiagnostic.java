package galateProject;

import java.text.*;
import java.util.*;
import java.util.Date;

import net.sf.jasperreports.engine.export.*;
import java.sql.*;
import net.sf.jasperreports.engine.*;
import java.io.*;

public class GeneratePdfAutodiagnostic
{
    public static void main(final String[] args) {
    }
    
    private static void removeBlankPage(final List<JRPrintPage> pages) {
        final Iterator<JRPrintPage> i = pages.iterator();
        while (i.hasNext()) {
            final JRPrintPage page = i.next();
            if (page.getElements().size() == 0) {
                i.remove();
            }
        }
    }
    
    public static void generatePdfAutodiagnostic(final Long testId, final UUID uuid, final Long memberId) {
        try {
            final Date aujourdhui = new Date();
            final DateFormat date = DateFormat.getDateTimeInstance(2, 2);
            final String dateD = date.format(aujourdhui);
            Class.forName("com.mysql.jdbc.Driver");
            final Connection connection = DriverManager.getConnection(ConnectionConfig.connectionString, ConnectionConfig.user, ConnectionConfig.password);
            final Map<String, Object> params = new HashMap<String, Object>();
            final InputStream logo = GeneratePdfEtalonnage.class.getResourceAsStream("logo.png");
            final InputStream logoT = GeneratePdfEtalonnage.class.getResourceAsStream("logo.png");
            Statement stmt = null;
            stmt = connection.createStatement();
            String sql;
            sql = "SELECT name FROM test where id = "+testId;
            ResultSet rs = stmt.executeQuery(sql);

            String testName ="" ;
            while(rs.next()){
               //Retrieve by column name
              
             testName = rs.getString("name");
              
            }
            //STEP 6: Clean-up environment
            rs.close();
            stmt.close();
          
             
            params.put("testName", testName);
            params.put("idmember", memberId);
            params.put("idtest", testId);
            params.put("date", dateD);
            params.put("logo", logo);
            params.put("logoT", logoT);
            final JasperPrint jasperPrint = JasperFillManager.fillReport(GeneratePdfEtalonnage.class.getResourceAsStream("resultat.jasper"), (Map)params, connection);
            final int number = jasperPrint.getPages().size();
            System.out.println("nombre des pages  = " + number);
            final List<JRPrintPage> pages = (List<JRPrintPage>)jasperPrint.getPages();
            removeBlankPage(pages);
            if (jasperPrint != null) {
                final JRPdfExporter exporter = new JRPdfExporter();
                exporter.setParameter(JRExporterParameter.JASPER_PRINT, (Object)jasperPrint);
                new File(String.valueOf(System.getProperty("java.io.tmpdir")) + "//" + uuid).mkdir();
                final File file = new File(String.valueOf(System.getProperty("java.io.tmpdir")) + "//" + uuid + "//resultat.pdf");
                System.out.println("method" + file.getAbsolutePath());
                final OutputStream output = new FileOutputStream(file);
                System.out.println(file.getAbsolutePath());
                exporter.setParameter(JRPdfExporterParameter.OUTPUT_STREAM, (Object)output);
                exporter.exportReport();
                System.out.println("create pdf");
            }
        }
        catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        catch (FileNotFoundException e2) {
            e2.printStackTrace();
        }
        catch (SQLException e3) {
            e3.printStackTrace();
        }
        catch (JRException e4) {
            e4.printStackTrace();
        }
    }
}