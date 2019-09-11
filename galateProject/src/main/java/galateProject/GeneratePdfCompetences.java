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
	
	


		public static void GeneratePdfCompetences(final Long testId, final UUID uuid, final Long memberId){
			String sbcompetences14=getCriterionsByIntervall(testId, memberId,1, 4);
			String sbcompetences57=getCriterionsByIntervall(testId, memberId,5, 7);
			String sbcompetences811=getCriterionsByIntervall(testId, memberId,8, 11);
			
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
				final InputStream img5 = GeneratePdfEtalonnage.class.getResourceAsStream("image.png");
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
				params.put("img5", img5);
				params.put("sbcompetences14", sbcompetences14);
				params.put("sbcompetences57", sbcompetences57);
				params.put("sbcompetences811", sbcompetences811);
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
		 
		 private static String getCriterionsByIntervall(Long testId, Long memberId, int a, int b){
			 System.out.println("ff "+testId+" "+memberId+" "+a+" "+b);
			 StringBuilder criterions = new StringBuilder();
			 try {
				 Class.forName("com.mysql.jdbc.Driver");
			 	Statement statement=null;
				final Connection connection = DriverManager.getConnection(ConnectionConfig.connectionString,
						ConnectionConfig.user, ConnectionConfig.password);
				statement=connection.createStatement();
				String sql = "SELECT name FROM criterion c left join criterion_result r on(c.id=r.id_criterion) where r.result>="+a+" and r.result<="+b+" and r.id_test=" + testId+" and r.id_member="+memberId;
				ResultSet resultSet = statement.executeQuery(sql);
				while (resultSet.next()) {
					criterions.append(resultSet.getString(1)).append(", ");
				}
				if(criterions.length()>2){
					criterions.delete(criterions.length()-2, criterions.length()-1);
				}
			 } catch (SQLException e) {
					e.printStackTrace();
			}catch (ClassNotFoundException e) {
				// TODO: handle exception
			}
			 return criterions.toString();
		 }
		    
	}



