package galateProject;

import java.util.*;
import net.sf.jasperreports.engine.export.*;
import java.sql.*;
import net.sf.jasperreports.engine.*;
import java.io.*;

public class GeneratePdfEtalonnage
{
    public static void main(final String[] args) {
    }
    
    public static void genererPdfEtalonnage(final Long testId, final UUID uuid) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            final Connection connection = DriverManager.getConnection(ConnectionConfig.connectionString, ConnectionConfig.user, ConnectionConfig.password);
            final Map<String, Object> params = new HashMap<String, Object>();
            params.put("idtest", testId);
            final JasperPrint jasperPrint = JasperFillManager.fillReport(GeneratePdfEtalonnage.class.getResourceAsStream("etalonnage.jasper"), (Map)params, connection);
            if (jasperPrint != null) {
                final JRPdfExporter exporter = new JRPdfExporter();
                exporter.setParameter(JRExporterParameter.JASPER_PRINT, (Object)jasperPrint);
                new File(String.valueOf(System.getProperty("java.io.tmpdir")) + "//" + uuid).mkdir();
                final File file = new File(String.valueOf(System.getProperty("java.io.tmpdir")) + "//" + uuid + "//etalonnage.pdf");
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