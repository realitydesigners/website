import { useCallback, useState } from 'react';
import { useCategory } from './CategoryContext';

export const useCategoryInteraction = category => {
   const { navigation, setNavigation } = useCategory();

   // State variables
   const [highlightedCategory, setHighlightedCategory] = useState(null);
   const [selectedCategory, setSelectedCategory] = useState(null);
   const [highlightedSubcategory, setHighlightedSubcategory] = useState(null);
   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
   const [subcategoryContent, setSubcategoryContent] = useState([]);
   const [activeBackgroundScene, setActiveBackgroundScene] = useState(null);

   const mainCategories = Array.isArray(category) ? category.filter(cat => Boolean(cat.title) && cat.isMain) : [];

   const subCategories = Array.isArray(category.subCategories) ? category.subCategories.filter(subCat => Boolean(subCat.title)) : [];

   const onCategoryHover = useCallback(
      subcategoryName => {
         const relatedPosts = category.subCategories.find(sub => sub.slug.current === subcategoryName)?.associatedPosts || [];

         setSubcategoryContent(relatedPosts);
         setIsSidebarVisible(true);
      },
      [category.subCategories],
   );

   const onCategoryLeave = useCallback(() => {
      setIsSidebarVisible(false);
   }, []);

   const onCategorySelect = useCallback(
      (categoryName, subcategoryName) => {
         setSelectedCategory(categoryName);
         setHighlightedCategory(categoryName);

         const currentCategory = category.subCategories.find(sub => sub.slug.current === subcategoryName);

         if (currentCategory?.sceneIdentifier) {
            setActiveBackgroundScene(currentCategory.sceneIdentifier);
         }

         setSubcategoryContent(currentCategory?.associatedPosts || []);
         setSelectedSubcategory(subcategoryName || null);

         setNavigation(prev => ({
            ...prev,
            mainCategory: categoryName,
            subCategory: subcategoryName || prev.subCategory,
         }));
      },
      [category.subCategories, setNavigation],
   );

   // Debugging logs
   console.log('Category data Fetched From Parent Page:', category);
   console.log('subCategories', subCategories);

   return {
      onCategorySelect,
      onCategoryHover,
      onCategoryLeave,
      mainCategories,
      subCategories,
      highlightedCategory,
      selectedCategory,
      isSidebarVisible,
      subcategoryContent,
      activeBackgroundScene,
   };
};

export default useCategoryInteraction;
