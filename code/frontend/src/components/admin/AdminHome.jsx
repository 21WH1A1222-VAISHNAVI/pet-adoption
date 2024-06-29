import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import axiosInstance from '../common/AxiosInstance';
import { message } from 'antd';

const AdminHome = () => {
   const [postAnimal, setPostAnimal] = useState({
      name: '',
      species: '',
      age: '',
      description: '',
      photos: []
   })

   const handleChange = (e) => {
      setPostAnimal({ ...postAnimal, [e.target.name]: e.target.value })
   }

   const handleAnimalTypeChange = (e) => {
      setPostAnimal({ ...postAnimal, species: e.target.value });
   };

   const handlePhotosChange = (e) => {
      // Convert the FileList into an array
      const filesArray = Array.from(e.target.files);
      // console.log(filesArray)
      setPostAnimal({ ...postAnimal, photos: filesArray });
   };

   const handleForm = async (e) => {
      e.preventDefault();
      // console.log(postAnimal)
      const formData = new FormData();
      formData.append('name', postAnimal.name)
      formData.append('species', postAnimal.species)
      formData.append('age', postAnimal.age)
      formData.append('description', postAnimal.description)
      for (let i = 0; i < postAnimal.photos.length; i++) {
         formData.append("photos", postAnimal.photos[i])
      }
      // formData.forEach((value, key) => {
      //    console.log(`${key}: ${value}`);
      // });


      try {
         const res = await axiosInstance.post('http://localhost:8001/api/admin/postanimal', formData, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
               'Content-Type': 'multipart/form-data'
            }
         })
         if (res.data.success) {
            message.success(res.data.message)
         }
         else {
            message.error(res.data.message)
         }
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <Form onSubmit={handleForm} className="mb-3">
         <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridTitle">
               <Form.Label>Animal Name</Form.Label>
               <Form.Control name='name' value={postAnimal.name} onChange={handleChange} type="text" placeholder="Enter name" required />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAnimalType">
               <Form.Label>Animal Type</Form.Label>
               <Form.Select value={postAnimal.species} onChange={handleAnimalTypeChange}>
                  <option value="">Select Type</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
               </Form.Select>
            </Form.Group>
         </Row>
         <Row>
            <Form.Group as={Col} controlId="formGridLocation">
               <Form.Label>Age</Form.Label>
               <Form.Control name='age' value={postAnimal.age} onChange={handleChange} type="text" placeholder="Enter age" required />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridLocation">
               <Form.Label>Photos</Form.Label>
               <Form.Control
                  name='photos'
                  onChange={handlePhotosChange}
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  multiple
               />
            </Form.Group>

         </Row>
         <Row className="mb-3">
            <Form.Group as={Row} controlId={`formGridDescrption`} className="mb-3">
               <Form.Label>Description</Form.Label>
               <Col sm={12}>
                  <Form.Control
                     as="textarea"
                     rows={4}
                     name="description"
                     value={postAnimal.description}
                     onChange={handleChange}
                     placeholder="Enter descrption"
                     required
                  />
               </Col>
            </Form.Group>
         </Row>

         <Button variant="primary" type="submit">
            Submit
         </Button>
      </Form>
   )
}

export default AdminHome
