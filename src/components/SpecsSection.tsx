import React from "react";

const SpecsSection = () => {
  return (
    <section className="w-full py-6 sm:py-10 bg-black" id="specifications">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Main content with text mask image - responsive text sizing */}
        <div className="max-w-5xl pl-4 sm:pl-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display leading-tight mb-8 sm:mb-12">
            <span className="block bg-gradient-to-r from-[#b40202] to-[#26179d] bg-clip-text text-transparent">
              {/* BIOCOM's Atlas Zero integrates seamlessly with human teams, enhancing productivity through advanced automation. By handling complex tasks with precision, improving workplace safety, and adapting to diverse environments, Atlas Zero empowers humans to focus on innovation and creative problem-solving. */}
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
