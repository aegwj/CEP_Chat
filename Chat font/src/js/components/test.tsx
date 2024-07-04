import React from 'react';
import { evalES } from '../lib/utils/bolt';

const ImageImporter: React.FC = () => {
 
  const imagePath = "E:\\下载\\登出.png"; // 替换为实际的图像路径

  const handleDoubleClick = () => {
    const escapedImagePath = imagePath.replace(/\\/g, "\\\\");

    evalES(
      `
      var importImageToComp = function(imagePath) {
        var project = app.project;
        var activeItem = project.activeItem;
        if (activeItem && activeItem instanceof CompItem) {
          var importedFile = new ImportOptions(File(imagePath));
          var importedItem = project.importFile(importedFile);
          var layer = activeItem.layers.add(importedItem);
          layer.property("Transform").property("Position").setValue([activeItem.width / 2, activeItem.height / 2]);
        }
      };
      importImageToComp("${escapedImagePath}");
    `,
      true
    );
  };

  return (
    <div>
      <h1>双击图片导入到AE</h1>
      <img
        src="path/to/local/image.png" // 替换为实际的图像路径或 URL
        alt="要导入的图片"
        onDoubleClick={handleDoubleClick}
        style={{ cursor: 'pointer', width: '200px' }}
      />
    </div>
  );
};

export default ImageImporter;
