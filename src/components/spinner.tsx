import React from 'react';

// Definējam mainīgos, kurus varēs pielāgot (props)
interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'medium', 
  color = '#222' // Noklusējuma krāsa pieskaņota tavas tabulas galvenei
}) => {
  
  // Konfigurējam izmērus atkarībā no izvēlētā "size" propa
  const dimensions = {
    small: { width: '20px', height: '20px', border: '2px' },
    medium: { width: '40px', height: '40px', border: '4px' },
    large: { width: '60px', height: '60px', border: '6px' },
  }[size];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div
        style={{
          width: dimensions.width,
          height: dimensions.height,
          border: `${dimensions.border} solid #f3f3f3`, // Gaišais aplis fonā
          borderTop: `${dimensions.border} solid ${color}`, // Rotējošā krāsainā daļa
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite', // Animācijas ātrums
        }}
      />

      {/* Nepieciešamais CSS kods rotācijas kustībai */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
