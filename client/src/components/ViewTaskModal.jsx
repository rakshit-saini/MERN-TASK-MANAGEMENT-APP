import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";

const ViewTaskModal = ({ showViewModal, handleViewModalClose, id }) => {
  const [task, setTask] = useState([]);
  useEffect(() => {
    const getSingleTask = async () => {
      await axios
        .get(`https://mern-task-management-app-4l18.onrender.com/api/v1/task/single/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTask(res.data.task);
        })
        .catch((error) => {
          
        });
    };
    if (id) {
      getSingleTask();
    }
  }, [id]);

  return (
    <>
      <Modal show={showViewModal} onHide={handleViewModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack>
            <p className="fw-bold mb-0">Title</p>
            <p>{task && task.title}</p>
          </Stack>
          <Stack>
            <p className="fw-bold mb-0">Description</p>
            <p>{task && task.description}</p>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleViewModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewTaskModal;