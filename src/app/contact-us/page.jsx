'use client';
import Link from 'next/link';
import { useState } from 'react';
import '../../styles/contact.scss';
import DOMPurify from 'dompurify';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        body: ''
    });
    const [errors, setErrors] = useState({});
    const [isSending, setIsSending] = useState(false);
    const [sendSuccess, setSendSuccess] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Cleanse input to prevent script injection using DOMPurify
        const sanitizedValue = DOMPurify.sanitize(value);
        setFormData({
            ...formData,
            [name]: sanitizedValue
        });

        // Clear error message for textarea when user starts typing
        if (name === 'body') {
            setErrors({
                ...errors,
                body: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Please enter your name';
        if (!formData.email) newErrors.email = 'Please enter a valid email address';
        if (!formData.body) newErrors.body = 'This field cannot be empty';
        if (/\b(script|<|>)/i.test(formData.name)) newErrors.name = 'Invalid characters entered';
        if (/\b(script|<|>)/i.test(formData.email)) newErrors.email = 'Invalid characters entered';
        if (/\b(script|<|>)/i.test(formData.body)) newErrors.body = 'Invalid characters entered';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSending(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-mail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'bda07dc4-cab9-4148-ac9c-7a44c3c55wqr9'
                },
                body: JSON.stringify({
                    name: DOMPurify.sanitize(formData.name),
                    email: DOMPurify.sanitize(formData.email),
                    body: DOMPurify.sanitize(formData.body)
                })
            });

            if (response.ok) {
                setSendSuccess(true);
                setFormData({ name: '', email: '', body: '' });
                setErrors({});
            } else {
                const errorData = await response.json();
                console.error('Error sending email:', errorData);
                alert('Failed to send email.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send email.');
        } finally {
            setIsSending(false);
            setTimeout(() => {
                setSendSuccess(false);
            }, 15000);
        }
    };

    return (
        <>
            <div className="section_contact">
                <div className="container">
                    <h2>Contact Us</h2>
                    <div className="row_flex">
                        <div className="contact_left">
                            <h3>General Enquiries</h3>
                            <p>Please visit our <Link href='/info?tag=faq'>FAQs</Link> page before sending us a message. And if you still don't find what you are looking for, feel free to send us a message!</p>
                            <p>We will make every effort to respond within 5 business days, however, response times can be affected due to the high volume of emails we receive each day.</p>
                        </div>
                        <div className="contact_right">
                            <form onSubmit={handleSubmit}>
                                <div className="form_box">
                                    <span>Your Name</span>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder='eg. John Doe'
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={errors.name ? 'error' : ''}
                                    />
                                    {errors.name && <p className="error">{errors.name}</p>}
                                </div>
                                <div className="form_box">
                                    <span>Email Address</span>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder='abc@example.com'
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={errors.email ? 'error' : ''}
                                    />
                                    {errors.email && <p className="error">{errors.email}</p>}
                                </div>
                                <div className="form_box">
                                    <span>What can we help you?</span>
                                    <textarea
                                        name="body"
                                        placeholder='Write here...'
                                        value={formData.body}
                                        onChange={handleChange}
                                        className={errors.body ? 'error' : ''}
                                    ></textarea>
                                    {errors.body && <p className="error">{errors.body}</p>}
                                </div>
                                <div className="form_box">
                                    <button type="submit" disabled={isSending}>
                                        {isSending ? 'Sending...' : 'Send'}
                                    </button>
                                    {sendSuccess && <p className="success">Thank you! Your message has been sent.</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section_bottom">
                <div className="container">
                    <div className="sb_box">
                        <h3>Partnership</h3>
                        <p>For partnership enquiries, please email at <br/><Link href="mailto:arni.bashir@drh.com.my">partnership@ombakfestival.com</Link></p>
                    </div>
                    <div className="sb_box">
                        <h3>Press</h3>
                        <p>For press enquiries, please email at <br/><Link href="mailto:gowri.mohanadas@drh.com.my">media@ombakfestival.com</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}
