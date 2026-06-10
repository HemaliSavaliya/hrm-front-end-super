/** @module CompanyLogoCell — Renders a company logo image or a fallback initial avatar. */

/**
 * Displays the company logo if a blob URL is available; otherwise shows the first letter.
 * @param {{ row: object, logoUrls: object }} props
 * @returns {JSX.Element}
 */
const CompanyLogoCell = ({ row, logoUrls }) => (
  <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
    {logoUrls[row.id] ? (
      <img src={logoUrls[row.id]} alt={`Logo ${row.id}`} style={{ width: 35, height: 35, objectFit: 'contain' }} />
    ) : (
      <div style={{
        display: 'flex', backgroundColor: 'rgb(240,240,240)', borderRadius: '64%',
        width: '20px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#000'
      }}>
        {row.companyName?.charAt(0)?.toUpperCase()}
      </div>
    )}
  </div>
)

export default CompanyLogoCell
