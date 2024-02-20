import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { type } from 'os';

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
    
    const validateForm = () => {
        let errors = [];
        Object.keys(formData).forEach(key => {
            if (typeof formData[key] === 'string' && !formData[key].trim()) {
                errors.push(`${key} is required.`);
            }
        });
        // Validation for nested objects (image and address)
        if (!formData.image.url.trim()) errors.push("Image URL is required.");
        if (!formData.address.country.trim()) errors.push("Country is required.");
    
        setFormErrors(errors); 
        return errors.length === 0;
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
            response = await axios.put(`http://localhost:3000/api/v1/cards/${card._id}`, payload, {
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