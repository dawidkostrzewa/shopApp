import { useNavigate } from "react-router-dom";
import { Button, Card, Typography } from "@mui/material";
import { CartCategory, useAppContext } from "../../../Context/AppContext";
import { CenterMode } from '../../Utils/Slider/Slide'


const Category = () => {
    const { setSelectedCategories, categories } = useAppContext()
    const navigate = useNavigate();

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
                <Button
                    size="medium"
                    variant="contained"
                    onClick={() => {
                        navigate('/Store');
                        setSelectedCategories(category.id)

                    }}
                    sx={{
                        borderRadius: '10px',
                        backgroundColor: '#1871c2',
                        width: '150px',
                        '&:hover': {
                            backgroundColor: '#185EA5',

                        },
                    }}
                >
                    Go to store
                </Button>
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