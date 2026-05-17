import { useNavigate } from "react-router-dom";

function Landing() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center px-6">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

        <div>

          <h1 className="text-6xl font-extrabold text-green-900 leading-tight mb-6">
             QR Platform
            <span className="text-green-600 block mt-2">
              For Digital Sharing
            </span>
          </h1>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Generate  QR codes for URLs, text, images,
            and documents.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-2xl text-lg shadow-lg"
          >
            Get Started
          </button>

        </div>

        <div className="flex justify-center">

          <div className="bg-white p-10 rounded-3xl shadow-2xl">

            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=AgriTechQR"
              alt="QR"
              className="w-[320px]"
            />

          </div>

        </div>

      </div>

    </div>

  );

}

export default Landing;