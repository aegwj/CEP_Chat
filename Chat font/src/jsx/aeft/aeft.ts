export const example = () => { 
  alert("Hello, World!");
};


export const importImage = (imagePath: string) => {
  const file = new File(imagePath);

  if (!file.exists) {
    alert("Image file not found.");
    return;
  }

  app.beginUndoGroup("Import Image");
  const importOptions = new ImportOptions();
  importOptions.file = file;

  const importedItem = app.project.importFile(importOptions);
  const currentComp = app.project.activeItem as CompItem | undefined;

  if (currentComp && importedItem instanceof AVItem) {
    currentComp.layers.add(importedItem);
  } else {
    alert("No active comp or imported item is not an AVItem.");
  }

  app.endUndoGroup();
};


  

export const importImageToComp = () => {
   const imagePath = "E:\\下载\\登出.png";
  // 创建File对象
  var file = new File(imagePath);

  // 检查文件是否存在
  if (!file.exists) {
    alert("图片文件不存在。");
    return;
  }

  // 导入图片
  app.beginUndoGroup("Import Image");
  var importOptions = new ImportOptions();
  importOptions.file = file;
  var importedFootage;
  try {
    importedFootage = app.project.importFile(importOptions);
  } catch (e:any) {
    app.endUndoGroup();
    alert("导入图片时出错: " + e.toString());
    return;
  }

 
  app.endUndoGroup();
}





