import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';


interface ICard {
    _id?: string;
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web: string;
    image: {
        url: string;
        alt: string;
    };
    address: {
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
    };
}

type Props = {
    card?: ICard; // Optional prop for editing
};

const BusinessCardForm: React.FC<Props> = ({ card }) => {
    const [formData, setFormData] = useState<ICard>({
        title: '',
        subtitle: '',
        description: '',
        phone: '',
        email: '',
        web: '',
        image: {
            url: '',
            alt: '',
        },
        address: {
            country: '',
            city: '',
            street: '',
            houseNumber: 0,
            zip: 0,
        },
    });
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [cardId, setCardId] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if (location.state && (location.state as any).card) {
            const cardToEdit = (location.state as any).card as ICard;
            // Ensure you spread the existing data properly, especially for nested objects
            setFormData({ ...cardToEdit, image: { ...cardToEdit.image }, address: { ...cardToEdit.address } });
        }
    }, [location]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Check if the changed field belongs to 'image' or 'address' objects
        if (name.startsWith('image.') || name.startsWith('address.')) {
            const [key, field] = name.split('.');
            setFormData(prevState => ({
                ...prevState,
                [key]: {
                    ...(prevState[key as keyof typeof prevState] as object),
                    [field]: value,
                },
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const loadCardData = async () => {
        try {
            const url = `http://localhost:3000/api/v1/cards/${cardId}`;
            console.log('Fetching card from:', url); // Log the URL for debugging
    
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            console.log('Card data received:', response.data); // Log the received data
            setFormData(response.data); // Adjust this if the data structure is different
        } 
        catch (error) {
            // Improved error handling
            if (error.response) {
                // The server responded with a status code that falls out of the range of 2xx
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Explicitly convert houseNumber and zip to numbers to match backend expectations
        const payload = {
            ...formData,
            address: {
                ...formData.address,
                houseNumber: Number(formData.address.houseNumber),
                zip: Number(formData.address.zip),
            },
        };
    try {
        let response;
        if (card) {
            response = await axios.get(`http://localhost:3000/api/v1/cards/${card._id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
        } else {
            response = await axios.post('http://localhost:3000/api/v1/cards', payload, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
        }
        console.log(response.data);
        navigate('/create-card');
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};

return (
    <form onSubmit={handleSubmit}>
        <div>
            <input
                type="text"
                value={cardId}
                onChange={(e) => setCardId(e.target.value)}
                placeholder="Card ID"
            />
            <button type="button" onClick={loadCardData}>Load Card</button>
        </div>
        {formErrors.length > 0 && (
            <div className="form-errors">
                {formErrors.map((error, index) => (
                    <p key={index} className="error-message">{error}</p>
                ))}
            </div>
        )}
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="Subtitle" />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="web" value={formData.web} onChange={handleChange} placeholder="Web" />
        <input type="text" name="image.url" value={formData.image.url} onChange={handleChange} placeholder="Image URL" required />
        <input type="text" name="image.alt" value={formData.image.alt} onChange={handleChange} placeholder="Image Alt" />
        <input type="text" name="address.country" value={formData.address.country} onChange={handleChange} placeholder="Country" required />
        <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} placeholder="City" required />
        <input type="text" name="address.street" value={formData.address.street} onChange={handleChange} placeholder="Street" required />
        <input type="number" name="address.houseNumber" value={formData.address.houseNumber.toString()} onChange={handleChange} placeholder="House Number" required />
        <input type="number" name="address.zip" value={formData.address.zip.toString()} onChange={handleChange} placeholder="Zip" required />
        <button type="submit">Submit</button>
    </form>
);
};

export default BusinessCardForm;