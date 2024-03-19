import { useState } from "react";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState("");

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("image", file);
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: formData,
      });

      const resData = await res.json();

      console.log("resData", resData);
    } catch (error) {
      setError("Server Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <h1 className="main_heading">Sign Up</h1>

      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="registration_form"
      >
        <label htmlFor="firstName">First Name</label>
        <input
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, firstName: e.target.value }))
          }
          type="text"
          id="firstName"
          name="firstName"
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, lastName: e.target.value }))
          }
          type="text"
          id="lastName"
          name="lastName"
        />

        <label htmlFor="email">Email</label>
        <input
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, email: e.target.value }))
          }
          type="text"
          id="email"
          name="email"
        />

        <label htmlFor="phone">Phone</label>
        <input
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, phone: e.target.value }))
          }
          type="text"
          id="phone"
          name="phone"
        />

        <input
          type="file"
          className="file_upload"
          name="image"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          accept="image/png, image/jpeg, image/jpg"
        />
        <button className="submit_btn">
          {loading ? "Submitting" : "Submit"}
        </button>
      </form>

      {error && <p>{error}</p>}
    </main>
  );
};

export default App;
