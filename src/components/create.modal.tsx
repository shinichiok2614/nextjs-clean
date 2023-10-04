import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface IProps {
  showModalCreate: boolean;
  setShowMdalCreate: (value: boolean) => void;
}
function CreateModal(props: IProps) {
  const { showModalCreate, setShowMdalCreate } = props;
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const handleClose = () => setShowMdalCreate(false);
  const handleShow = () => setShowMdalCreate(true);

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const handleSubmit = () => {
    if (!title) {
      toast.error("Not empty title !");
      return;
    }
    if (!author) {
      toast.error("Not empty author !");
      return;
    }
    if (!content) {
      toast.error("Not empty content !");
      return;
    }
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, author, content }),
    })
      .then((res) => res.json())
      // .then((res) => console.log("check data res = ", res));
      .then((res) => {
        if (res) {
          toast.success("Create new blogs succeed !");
          handleClose();
          mutate("http://localhost:8000/blogs");
        }
      });
    // toast.success("Create succeed ! ...");
    // toast.warning("Create succeed ! ...");
    // toast.error("Create succeed ! ...");
    // toast.info("Create succeed ! ...");
    console.log("check data form: ", title, author, content);
  };
  const handleCloseModal = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setShowMdalCreate(false);
  };
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        // show={show}
        show={showModalCreate}
        // onHide={handleClose}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New A Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don not even try to press
          escape key.
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="email"
                placeholder="..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="email"
                placeholder="..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}> */}
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModal;
