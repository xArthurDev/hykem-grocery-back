export class Utils {
  errorHandlerMessage(codeError: string, errorSourceRoute: string): string {
    const includesMessages = {
      user: 'user',
      product: 'product',
      category: 'category',
    };

    const foundedReference = Object.keys(includesMessages).find((key) =>
      errorSourceRoute.toLowerCase().includes(includesMessages[key]),
    );

    const codeErrorMatrix = {
      P2025: `Sorry, we dont found any ${foundedReference} with that id`,
    };

    const errorSourceRouteMatrix = {
      getAllUsers: 'Ocurred an error on trying to get all users',
      createUser: 'Ocurred an error on trying to create the user',
      getUserDetails: 'Ocurred an error on trying to get the user data',
      updateUser: 'Ocurred an error on trying to update the user',
      deleteUser: 'Ocurred an error on trying to delete the user',
      getAllProducts: 'Ocurred an error on trying to get all products',
      getFilteredProducts:
        'Ocurred an error on trying to get filtered products',
      createProduct: 'Ocurred an error on trying to create the product',
      updateProduct: 'Ocurred an error on trying to update the product',
      deleteProduct: 'Ocurred an error on trying to delete the product',
      getProductDetails: 'Ocurred an error on trying to get the product data',
      getAllCategories: 'Ocurred an error on trying to get all categories',
      getCategoryById: 'Ocurred an error on trying to get category by id',
      createCategory: 'Ocurred an error on trying to create the category',
      updateCategory: 'Ocurred an error on trying to update the category',
      deleteCategory: 'Ocurred an error on trying to delete the category',
    };

    return (
      codeErrorMatrix[codeError] || errorSourceRouteMatrix[errorSourceRoute]
    );
  }
}

export default new Utils();
