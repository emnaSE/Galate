package galateProject;




import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JRPrintPage;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.export.JRPdfExporterParameter;
public class GeneratePdfCompetences {
	
	


		public static void GeneratePdfCompetences(final Long testId, final UUID uuid, final Long memberId) {
			try {
				final Date today = new Date();
				final DateFormat date = DateFormat.getDateTimeInstance(2, 2);
				final String now = date.format(today);
				final Map<String, Object> params = new HashMap<String, Object>();
				final InputStream logo = GeneratePdfEtalonnage.class.getResourceAsStream("logo.png");
				final InputStream logoT = GeneratePdfEtalonnage.class.getResourceAsStream("logo.png");
				final InputStream img1 = GeneratePdfEtalonnage.class.getResourceAsStream("brGear.png");
				final InputStream img2 = GeneratePdfEtalonnage.class.getResourceAsStream("srIcon.png");
				final InputStream img3 = GeneratePdfEtalonnage.class.getResourceAsStream("growth.png");
				final InputStream img4 = GeneratePdfEtalonnage.class.getResourceAsStream("gal1.png");
				Class.forName("com.mysql.jdbc.Driver");
				final Connection connection = DriverManager.getConnection(ConnectionConfig.connectionString,
						ConnectionConfig.user, ConnectionConfig.password);
				String testName = getTestName(testId, connection);
				params.put("testName", testName);
				params.put("idmember", memberId);
				params.put("idtest", testId);
				params.put("date", now);
				params.put("logo", logo);
				params.put("logoT", logoT);
				params.put("img1", img1);
				params.put("img2", img2);
				params.put("img3", img3);
				params.put("img4", img4);
				final JasperPrint jasperPrint = JasperFillManager.fillReport(
						GeneratePdfEtalonnage.class.getResourceAsStream("competences.jasper"), (Map) params, connection);
				final List<JRPrintPage> pages = (List<JRPrintPage>)jasperPrint.getPages();
		        removeBlankPage(pages);
				if (jasperPrint != null) {
					final JRPdfExporter exporter = new JRPdfExporter();
					exporter.setParameter(JRExporterParameter.JASPER_PRINT, (Object) jasperPrint);
					new File(String.valueOf(System.getProperty("java.io.tmpdir")) + "//" + uuid).mkdir();
					final File file = new File(
							String.valueOf(System.getProperty("java.io.tmpdir")) + "//" + uuid + "//competences.pdf");
					final OutputStream output = new FileOutputStream(file);
					exporter.setParameter(JRPdfExporterParameter.OUTPUT_STREAM, (Object) output);
					exporter.exportReport();
				}
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (FileNotFoundException e2) {
				e2.printStackTrace();
			} catch (SQLException e3) {
				e3.printStackTrace();
			} catch (JRException e4) {
				e4.printStackTrace();
			}
		}

		private static String getTestName(final Long testId, final Connection connection)
				throws ClassNotFoundException, SQLException {
			Statement stmt = null;
			stmt = connection.createStatement();
			String sql;
			sql = "SELECT name FROM test where id = " + testId;
			ResultSet rs = stmt.executeQuery(sql);
			String testName = "";
			while (rs.next()) {
				testName = rs.getString("name");
			}
			rs.close();
			stmt.close();
			return testName;
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
		    
	}



