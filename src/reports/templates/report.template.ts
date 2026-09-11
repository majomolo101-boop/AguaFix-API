import { CreateReportDto } from '../dto/create-report.dto';

const severityConfig: Record<string, { label: string; bg: string; color: string }> = {
  high: { label: 'SEVERIDAD ALTA', bg: '#fee2e2', color: '#991b1b' },
  medium: { label: 'SEVERIDAD MEDIA', bg: '#fef3c7', color: '#92400e' },
  low: { label: 'SEVERIDAD BAJA', bg: '#dcfce7', color: '#166534' },
};

export function generateReportTemplate(dto: CreateReportDto): string {
  const severity = severityConfig[dto.severity] ?? severityConfig.low;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nuevo Reporte de Fuga</title>
    </head>
    <body style="margin:0; font-family: Georgia, 'Times New Roman', serif; background-color: #eef0f2; padding: 24px;">
      <div style="max-width: 580px; margin: auto; background: #ffffff; border: 1px solid #d1d5db; border-radius: 6px; overflow: hidden;">

        <!-- Header -->
        <div style="background: #0c4a6e; padding: 26px 32px;">
          <div style="font-family: Arial, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: 0.04em; color: #ffffff;">AGUAFIX</div>
          <div style="font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 0.06em; color: #7dd3fc; text-transform: uppercase; margin-top: 3px;">Sistema municipal de reportes</div>
        </div>

        <!-- Body -->
        <div style="padding: 28px 32px;">
          <h1 style="font-family: Arial, sans-serif; font-size: 17px; font-weight: 700; color: #111827; margin: 0 0 4px;">Nuevo reporte de fuga registrado</h1>
          <p style="font-family: Arial, sans-serif; font-size: 12.5px; color: #6b7280; margin: 0 0 22px; line-height: 1.6;">
            Se ha registrado un nuevo reporte de fuga en la vía pública. A continuación se detalla la información capturada.
          </p>

          <div style="display: inline-block; background: ${severity.bg}; color: ${severity.color}; padding: 4px 12px; border-radius: 4px; font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.03em; margin-bottom: 20px;">
            ${severity.label}
          </div>

          <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 13px;">
            <tr>
              <td style="padding: 12px 14px; width: 150px; color: #0c4a6e; font-weight: 700; background: #f0f9ff; border-left: 3px solid #0284c7; vertical-align: top;">Dirección</td>
              <td style="padding: 12px 14px; color: #111827; background: #f8fafc; vertical-align: top;">${dto.address}</td>
            </tr>
            <tr>
              <td style="padding: 12px 14px; color: #0c4a6e; font-weight: 700; background: #f0f9ff; border-left: 3px solid #0284c7; vertical-align: top;">Descripción</td>
              <td style="padding: 12px 14px; color: #111827; background: #f8fafc; vertical-align: top;">${dto.description}</td>
            </tr>
            <tr>
              <td style="padding: 12px 14px; color: #0c4a6e; font-weight: 700; background: #f0f9ff; border-left: 3px solid #0284c7; vertical-align: top;">Teléfono</td>
              <td style="padding: 12px 14px; color: #111827; background: #f8fafc; vertical-align: top;">${dto.reporterPhone}</td>
            </tr>
          </table>
        </div>

        <!-- Footer -->
        <div style="padding: 16px 32px; background: #0c4a6e; font-family: Arial, sans-serif; font-size: 10.5px; color: #93c5fd; text-align: center;">
          Mensaje generado automáticamente por AguaFix API
        </div>
      </div>
    </body>
    </html>
  `;
}