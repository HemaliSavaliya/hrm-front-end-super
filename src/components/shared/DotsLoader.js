/** @module DotsLoader — Three bouncing dots loader shown while table data is fetching. */
import { Box } from '@mui/material'
import { keyframes } from '@emotion/react'

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40%           { transform: scale(1.1); opacity: 1; }
`

const DotsLoader = ({ minHeight = '280px' }) => (
  <Box
    display='flex'
    alignItems='center'
    justifyContent='center'
    sx={{ minHeight, width: '100%', gap: '10px' }}
  >
    {[0, 1, 2].map(i => (
      <Box
        key={i}
        sx={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          animation: `${bounce} 1.2s ease-in-out infinite both`,
          animationDelay: `${i * 0.2}s`,
        }}
      />
    ))}
  </Box>
)

export default DotsLoader
