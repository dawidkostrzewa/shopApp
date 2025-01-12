import { Box } from '@mui/joy'


const WrapImg = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Box height='200px'
            sx={{
                backgroundImage: 'url(https://x13.pl/img/cms/blog/zmiana-zdjecia/nowe_zdjecie.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}

        >
            {children}
        </Box>
    )
}

export default WrapImg
