import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import CreateModal from "./create.modal";
import { useState } from "react";
interface IProps {
  blogs: IBlog[];
}
function AppTable(props: IProps) {
  const { blogs } = props;
  console.log("check props", blogs);
  const [showModalCreate, setShowMdalCreate] = useState<boolean>(false);
  return (
    <>
      <div
        className="mx-3 mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>Table Blogs</h3>
        <Button onClick={() => setShowMdalCreate(true)}>Add New</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => {
            return (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>
                  <Button>View</Button>
                  <Button variant="warning" className="mx-3">
                    Edit
                  </Button>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            );
          })}
          {/* <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr> */}
        </tbody>
      </Table>
      <CreateModal
        showModalCreate={showModalCreate}
        setShowMdalCreate={setShowMdalCreate}
      />
    </>
  );
}

export default AppTable;
