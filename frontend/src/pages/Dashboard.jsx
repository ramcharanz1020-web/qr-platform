import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {

  const navigate = useNavigate();

  const [qrType, setQrType] = useState("url");

  const [url, setUrl] = useState("");

  const [text, setText] = useState("");

  const [qrImage, setQrImage] = useState("");

  const [qrHistory, setQrHistory] = useState([]);

  const [loading, setLoading] = useState(false);
const [activeSection, setActiveSection] = useState("generate");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  const fetchQRHistory = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get(
        "/qr/myqrs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQrHistory(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchQRHistory();

  }, []);

  const generateQR = async () => {

    try {

      setLoading(true);

      setError("");

      const token = localStorage.getItem("token");

      const formData = new FormData();

formData.append(
  "destination_url",
  url
);

formData.append(
  "qr_type",
  qrType
);

formData.append(
  "text_content",
  text
);

if (file) {

  formData.append(
    "file",
    file
  );

}
formData.append("password", password);
formData.append("expiry_date", expiryDate);

const response = await API.post(
  "/qr/create",
  formData,
        {
         headers: {
  Authorization: `Bearer ${token}`,
  "Content-Type": "multipart/form-data",
},
        }
      );

      setQrImage(response.data.qrImage);

      fetchQRHistory();

      setLoading(false);

    }

    catch (error) {

      console.log(error);

      setLoading(false);

      setError("QR Generation Failed");

    }

  };
  const deleteQR = async (id) => {

  try {

    const token =
      localStorage.getItem("token");

    await API.delete(
      `/qr/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchQRHistory();

  }

  catch (error) {

    console.log(error);

  }

};

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex">
      <div className="w-[260px] bg-gradient-to-b from-green-900 to-green-700 text-white p-6 flex flex-col justify-between">

  <div>

    <h1 className="text-3xl font-bold mb-10">
      QR Platform
    </h1>

    <div className="flex flex-col gap-4">

      <button
  onClick={() => setActiveSection("dashboard")}
  className="text-left bg-green-800 hover:bg-green-700 px-4 py-3 rounded-lg"
>
  Dashboard
</button>

      <button
        onClick={() => setActiveSection("generate")}
        className="text-left hover:bg-green-800 px-4 py-3 rounded-lg"
      >
        Generate QR
      </button>

      <button
        onClick={() => setActiveSection("history")}
        className="text-left hover:bg-green-800 px-4 py-3 rounded-lg"
      >
        QR History
      </button>

      

    </div>

  </div>

  

</div>
 <div className="flex-1 p-10">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-green-900">
          Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      {activeSection === "dashboard" && (

        <div>

          <h1 className="text-5xl font-bold text-green-900 mb-6">
            Welcome Back
          </h1>

          <div className="grid grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-2xl shadow-lg">

              <h2 className="text-xl font-bold mb-2">
                Total QRs
              </h2>

              <p className="text-4xl font-bold text-green-700">
                {qrHistory.length}
              </p>

            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">

              <h2 className="text-xl font-bold mb-2">
                URL QRs
              </h2>

              <p className="text-4xl font-bold text-green-700">
                {
                  qrHistory.filter(
                    (qr) => qr.qr_type === "url"
                  ).length
                }
              </p>

            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">

              <h2 className="text-xl font-bold mb-2">
                TEXT QRs
              </h2>

              <p className="text-4xl font-bold text-green-700">
                {
                  qrHistory.filter(
                    (qr) => qr.qr_type === "text"
                  ).length
                }
              </p>

            </div>

          </div>

        </div>

      )}

      {activeSection === "generate" && (
        <div className="bg-white/90 backdrop-blur-lg shadow-2xl p-8 rounded-2xl max-w-[700px]">

          <div className="flex flex-wrap gap-4 mb-6">

    <button
      onClick={() => setQrType("url")}
      className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg"
    >
      URL
    </button>

    <button
      onClick={() => setQrType("text")}
      className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg"
    >
      TEXT
    </button>

    <button
      onClick={() => setQrType("image")}
      className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg"
    >
      IMAGE
    </button>

    <button
      onClick={() => setQrType("document")}
      className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg"
    >
      DOCUMENT
    </button>

  </div>

          {
            qrType === "url" && (

              <input
                type="text"
                placeholder="Enter URL"
                className="border border-green-300 p-3 w-full rounded-lg mb-4"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

            )
          }

          {
            qrType === "text" && (

              <textarea
                placeholder="Enter Text"
                className="border border-green-300 p-3 w-full rounded-lg mb-4"
                rows="5"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

            )
          }

          {
            (
              qrType === "image" ||
              qrType === "document"
            ) && (

              <input
                type="file"
                className="mb-4"
                onChange={(e) =>
                  setFile(e.target.files[0])
                }
              />

            )
          }
          <input
  type="password"
  placeholder="Set password (optional)"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="border border-green-300 p-3 w-full rounded-lg mb-4"
/>

<input
  type="datetime-local"
  value={expiryDate}
  onChange={(e) => setExpiryDate(e.target.value)}
  className="border border-green-300 p-3 w-full rounded-lg mb-4"
/>

          <button
            onClick={generateQR}
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg"
          >
            {
              loading
                ? "Generating..."
                : "Generate QR"
            }
          </button>

          {
            error && (

              <p className="text-red-600 mt-4">
                {error}
              </p>

            )
          }

          {
            qrImage && (

              <div className="mt-8">

                <img
                  src={qrImage}
                  alt="QR"
                  className="w-64"
                />

                <a
                  href={qrImage}
                  download="qr.png"
                  className="block mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg w-fit"
                >
                  Download QR
                </a>  

              </div>

            )
          }

        </div>
      )}

      {activeSection === "history" && (

        <div className="mt-12">

          <h2 className="text-3xl font-bold mb-6 text-green-900">
            QR History
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {
            qrHistory.map((qr) => (

              <div
                key={qr.id}
                className="bg-white shadow-lg rounded-2xl p-5"
              >

                <img
                  src={qr.qr_image}
                  alt="QR"
                  className="w-40 mb-4"
                />

                <p className="font-bold text-green-900 mb-2">
                  {qr.qr_type}
                </p>

                <p className="text-sm break-all mb-3 text-gray-700">
                  {qr.destination_url}
                </p>
                <button
  onClick={() => deleteQR(qr.id)}
  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-3"
>
  Delete
</button>

                {
                  qr.created_at && (

                    <p className="text-xs text-gray-500">
                      {
                        new Date(qr.created_at)
                          .toLocaleString()
                      }
                    </p>

                  )
                }

              </div>

            ))
          }

        </div>

      </div>

    )}

    </div>
    </div>

  );

}

export default Dashboard;

