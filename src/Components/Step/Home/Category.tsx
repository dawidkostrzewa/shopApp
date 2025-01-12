import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Button, Card, Typography } from "@mui/material";
import { Product, useAppContext } from "../../../Context/AppContext";
import { api } from "../../API/API";
import { CenterMode } from '../../Utils/Slider/Slide'


const Category = () => {
    const { setSelectedCategories } = useAppContext()
    const navigate = useNavigate();

    const [categories, setCategories] = useState<Product['category'][]>([]);


    useEffect(() => {
        api('categories').then((result) => {
            setCategories(result);
        });
    }, []);

    const element = categories.map((category) => {

        return (
            <>  <Card sx={{
                width: '250px',
                height: '400px',
                borderRadius: 3,
                padding: '30px 15px',
                boxSizing: 'border-box',
                overflow: 'hidden',
                boxShadow: '0px 0px 10px 0.1px #eee',
                margin: '20px auto',
                backgroundImage: `url(${category.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',

            }
            }>
                <Typography variant="body1" sx={{
                    color: '#eee',
                    textShadow: ' 0 0 1px #bbb'
                }} >
                    CATEGORY:
                </Typography>
                <Typography variant="h3" sx={{
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