import { CardMedia } from '@mui/material'


export const mapImgToComponents = (photo: string[]) => {
    const photoCarousel = photo.map((element) => {
        if (!element.startsWith('https://')) return
        return (
            <CardMedia
                component="img"
                height='200px'
                width='100%'
                image={element}
                alt=''
            />
        )
    })
    return photoCarousel

}

