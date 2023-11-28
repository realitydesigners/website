export function getCategoryPositions(count, offset = [0, 0, 0], radius = 15) {
   const fullCircle = Math.PI * 2;
   return Array.from({ length: count }, (_, i) => {
      const angle = (fullCircle * i) / count;
      return [
         Math.cos(angle) * radius + offset[0],
         offset[1], // y is kept constant
         Math.sin(angle) * radius + offset[2],
      ];
   });
}

export function getSubCategoryPositions(count, offset = [0, 0, 0], radius = 15) {
   const fullCircle = Math.PI * 2;
   return Array.from({ length: count }, (_, i) => {
      const angle = (fullCircle * i) / count;
      return [
         Math.cos(angle) * radius + offset[0],
         offset[1], // y is kept constant
         Math.sin(angle) * radius + offset[2],
      ];
   });
}

export const getRefPostPosition = (index, count, subCategoryPosition) => {
   const radius = 10; // Radius can be adjusted if needed
   const fullCircle = Math.PI * 3;
   const angle = (fullCircle * index) / count;
   return [
      subCategoryPosition[0] + Math.cos(angle) * radius,
      subCategoryPosition[1] + Math.sin(angle) * radius,
      subCategoryPosition[2], // z-coordinate remains the same
   ];
};
