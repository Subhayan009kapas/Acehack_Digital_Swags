import React, { useState, useRef, useEffect } from "react";
const template = "./images/swag/Mentor & Judge.png";
const defaultAvatar = "/images/swag/NewDefault_gaming.png";
import FancyButton from "./FancyButton";

const Swag = () => {
  // State declarations
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");

  // Ref declarations
  const canvasRef = useRef(null);
  const imageInputRef = useRef(null);
  const defaultAvatarRef = useRef(null);

  useEffect(() => {
    drawSwag();
  }, [name, image]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const defaultAvatarImg = defaultAvatarRef.current;

    defaultAvatarImg.onload = () => {
      ctx.drawImage(defaultAvatarImg, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        setImage({
          src: reader.result,
          width: img.width,
          height: img.height,
        });
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadSwag = () => {
    const canvas = canvasRef.current;
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    const scaleFactor = 2;

    tempCanvas.width = canvas.width * scaleFactor;
    tempCanvas.height = canvas.height * scaleFactor;

    tempCtx.drawImage(
      canvas,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      tempCanvas.width,
      tempCanvas.height
    );

    const dataURL = tempCanvas.toDataURL("image/png", 1.0);
    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = "generated_swag.png";
    downloadLink.click();
  };

  const drawSwag = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (image) {
      const uploadedImage = new Image();
      uploadedImage.onload = () => {
        let sx, sy, sWidth, sHeight;
        const aspectRatioCanvas = canvas.width / canvas.height;
        const aspectRatioImage = uploadedImage.width / uploadedImage.height;

        if (aspectRatioImage > aspectRatioCanvas) {
          sWidth = uploadedImage.height * aspectRatioCanvas;
          sHeight = uploadedImage.height;
          sx = (uploadedImage.width - sWidth) / 2;
          sy = 0;
        } else {
          sWidth = uploadedImage.width;
          sHeight = uploadedImage.width / aspectRatioCanvas;
          sx = 0;
          sy = (uploadedImage.height - sHeight) / 2;
        }

        ctx.drawImage(
          uploadedImage,
          sx,
          sy,
          sWidth,
          sHeight,
          0,
          0,
          canvas.width,
          canvas.height
        );
      };
      uploadedImage.src = image.src;
    } else {
      const defaultAvatarImg = defaultAvatarRef.current;
      ctx.drawImage(defaultAvatarImg, 0, 0, canvas.width, canvas.height);
    }

    const templateImage = new Image();
    templateImage.onload = () => {
      ctx.drawImage(templateImage, 0, 0, canvas.width, canvas.height);
      const fontSize = canvas.width * 0.055;
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      const textY = canvas.height - canvas.height * 0.17;
      ctx.fillText(name || "Your Name Here", canvas.width / 2, textY);
    };
    templateImage.src = template;
  };

  return (
    <div className="min-h-[100vh] flex items-center py-8 md:py-12 relative bg-gradient-to-r from-[#fbff00] to-[#00f0ff] text-black">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex justify-center mb-6">
          <h1 className="grad-text text-3xl md:text-5xl font-bold">
            Get Your Digital Swag
          </h1>
        </div>
        <br></br>

        <div className="flex flex-col md:flex-row justify-between items-center xl:mx-40">
          <div className="w-full md:w-[80%] flex justify-center mb-5 md:mb-0">
            <div className="w-full aspect-[4/5] max-w-[900px]">
              <canvas
                ref={canvasRef}
                width={900}
                height={1125}
                style={{
                  display: "block",
                 
                  backgroundColor: "black",
                  position:"relative",
                  top:"2vh"
                }}
                 className="w-full md:w-[80%] h-full md:h-[80%] rounded-sm border-4 border-[#05002582]"
              />
            </div>
            <img
              ref={defaultAvatarRef}
              src={defaultAvatar}
              alt="Default Avatar"
              style={{ display: "none" }}
            />
          </div>

          <div className="w-full md:w-1/2 lg:w-2/3 flex flex-col justify-between md:ml-10">
            <div className="text-center md:text-left mb-4 lg:mb-5">
              <div className="heading mb-8 md:mb-4">
                <h2 className="text-2xl md:text-4xl grad-text font-bold mb-4 mt-2">
                  AceHack 4.0 Digital Badge
                </h2>
              </div>
              <p className="lg:mb-3 mb-1 font-bold">
                Ready to rock AceHack 4.0? Show the world your excitement with
                our exclusive digital badge!
              </p>
              <p className="lg:mb-3 mb-1 font-bold">
                Personalize your AceHack 4.0 Badge with your name and photo.
                Download it and spread the word on social media using{" "}
                <a
                  className="underline hover:text-purple-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/search?q=%23acehack"
                >
                  #AceHack
                </a>{" "}
                and tagging{" "}
                <a
                  className="underline hover:text-purple-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/AceHack_uemj"
                >
                  @AceHack_uemj
                </a>
                .
              </p>
              <p className="text-sm lg:mb-3 mb-1 text-green-1000 font-bold">
                <i>
                  *Your privacy matters! We never store your images on our
                  servers.
                </i>
              </p>
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                className="rounded-sm border-none w-full bg-black px-4 py-2 text-white text-lg mb-4"
              />

              <div className="flex flex-col md:flex-row justify-end gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={imageInputRef}
                  style={{ display: "none" }}
                />
                <button
                  onClick={() => imageInputRef.current.click()}
                  className="w-full md:w-auto"
                >
                  <FancyButton data="Upload your photo" id="upload" />
                </button>

                <button
                  onClick={handleDownloadSwag}
                  className="w-full md:w-auto"
                >
                  <FancyButton data="Download" id="download" />
                </button>

                <button className="w-full md:w-auto">
                  <a
                    href="https://ctt.ac/eX4AU"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FancyButton data="Share" id="share" />
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swag;
