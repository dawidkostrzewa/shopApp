
import { Card, Typography } from "@mui/material";
import { CartCategory, useAppContext } from "../../../Context/AppContext";
import { CenterMode } from '../../Utils/Slider/Slide'
import Btn from "../../Utils/Btn/Btn";
import Box from '@mui/material/Box';



const Category = () => {
    const { setSelectedCategories, categories } = useAppContext()

    const element = categories.map((category) => {

        return (
            <>  <Card sx={{
                ...CartCategory,
                backgroundImage: `url(${category.image})`
            }
            }>
                <Typography variant="body1" sx={{
                    color: '#eee',
                    textShadow: ' 0 0 1px #bbb'
                }} >
                    CATEGORY:
                </Typography>
                <Typography variant="h3" component={"h2"} sx={{
                    color: '#eee',
                    flex: '1',
                    textShadow: ' 0 0 5px #777'
                }} >
                    {category.name}
                </Typography>
                <Box sx={{
                    margin: '10px ',
                }} onClick={() => {
                    setSelectedCategories(category.id)
                }} >
                    <Btn web={`/Store`} >Go to store</Btn>
                </Box>


            </ Card >
            </ >
        );
    });




    return (
        <CenterMode numberViews={3}>
            {element}
        </CenterMode>
    )


};


export default Category