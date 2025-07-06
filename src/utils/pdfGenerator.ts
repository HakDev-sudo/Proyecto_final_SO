
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateCertificatePDF = async (
  courseName: string,
  studentName: string,
  completionDate: string
): Promise<void> => {
  try {
    // Crear un elemento temporal para el certificado
    const certificateElement = document.createElement('div');
    certificateElement.style.width = '800px';
    certificateElement.style.height = '600px';
    certificateElement.style.padding = '60px';
    certificateElement.style.backgroundColor = '#1f2937';
    certificateElement.style.color = 'white';
    certificateElement.style.fontFamily = 'Arial, sans-serif';
    certificateElement.style.position = 'absolute';
    certificateElement.style.left = '-9999px';
    certificateElement.style.border = '8px solid #eab308';
    certificateElement.style.borderRadius = '20px';

    certificateElement.innerHTML = `
      <div style="text-align: center; height: 100%;">
        <div style="margin-bottom: 40px;">
          <div style="display: inline-flex; align-items: center; margin-bottom: 20px;">
            <div style="width: 60px; height: 60px; background-color: #eab308; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px;">
              <span style="font-size: 24px; color: black;">🏆</span>
            </div>
            <div style="text-align: left;">
              <h1 style="font-size: 28px; font-weight: bold; margin: 0; color: white;">IA Academy</h1>
              <p style="color: #9ca3af; margin: 0;">Certificado de Finalización</p>
            </div>
          </div>
        </div>

        <div style="border-top: 2px solid #4b5563; border-bottom: 2px solid #4b5563; padding: 30px 0; margin: 30px 0;">
          <h2 style="font-size: 32px; font-weight: bold; color: #eab308; margin: 0 0 10px 0;">
            CERTIFICADO DE FINALIZACIÓN
          </h2>
          <p style="color: #d1d5db; font-size: 16px; margin: 0;">
            Se otorga este certificado a
          </p>
        </div>

        <div style="margin: 40px 0;">
          <div style="font-size: 36px; font-weight: bold; color: white; border-bottom: 3px solid #4b5563; display: inline-block; padding-bottom: 10px;">
            ${studentName}
          </div>
        </div>

        <div style="margin: 40px 0;">
          <p style="font-size: 18px; color: #d1d5db; margin: 0 0 10px 0;">
            Por completar exitosamente el curso
          </p>
          <h3 style="font-size: 24px; font-weight: bold; color: white; margin: 0 0 20px 0;">
            ${courseName}
          </h3>
          <p style="color: #9ca3af; font-size: 14px; margin: 0;">
            Fecha de finalización: ${completionDate}
          </p>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: end; margin-top: 60px; padding-top: 30px; border-top: 2px solid #4b5563;">
          <div style="text-align: center;">
            <div style="width: 120px; height: 2px; background-color: #4b5563; margin-bottom: 8px;"></div>
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">Instructor</p>
            <p style="color: white; font-weight: bold; font-size: 14px; margin: 5px 0 0 0;">IA Academy</p>
          </div>
          
          <div style="text-align: center;">
            <div style="width: 60px; height: 60px; background-color: #eab308; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 8px;">
              <span style="color: black; font-size: 20px;">🏆</span>
            </div>
            <p style="font-size: 10px; color: #9ca3af; margin: 0;">Certificado digital</p>
          </div>
          
          <div style="text-align: center;">
            <div style="width: 120px; height: 2px; background-color: #4b5563; margin-bottom: 8px;"></div>
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">Fecha</p>
            <p style="color: white; font-weight: bold; font-size: 14px; margin: 5px 0 0 0;">${completionDate}</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(certificateElement);

    // Convertir a canvas
    const canvas = await html2canvas(certificateElement, {
      backgroundColor: '#1f2937',
      scale: 2,
      useCORS: true,
      logging: false
    });

    // Remover el elemento temporal
    document.body.removeChild(certificateElement);

    // Crear PDF
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Descargar PDF
    const fileName = `Certificado_${courseName.replace(/\s+/g, '_')}_${studentName.replace(/\s+/g, '_')}.pdf`;
    pdf.save(fileName);

  } catch (error) {
    console.error('Error generando PDF:', error);
    throw new Error('No se pudo generar el certificado PDF');
  }
};
