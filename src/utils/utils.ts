export class Utils {
  errorHandlerMessage(codeError: string, errorSourceRoute: string): string {
    const includesMessages = {
      user: 'user with that id',
      product: 'product with that id',
      category: 'category with that id',
      shoplist: 'shoplist with that user id',
    };

    const foundedReference = Object.keys(includesMessages).find((key) =>
      errorSourceRoute.toLowerCase().includes(key),
    );

    const codeErrorMatrix = {
      P2025: `Sorry, we dont found any ${includesMessages[foundedReference]}`,
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
      getShoplistsByUserId:
        'Ocurred an error on trying to get shoplists by user id',
      createShoplist: 'Ocurred an error on trying to create the shoplist',
      getShoplistDetailsById:
        'Ocurred an error on trying to get the shoplist data',
      updateShoplist: 'Ocurred an error on trying to update the shoplist',
      deleteShoplist: 'Ocurred an error on trying to delete the shoplist',
    };

    return (
      codeErrorMatrix[codeError] || errorSourceRouteMatrix[errorSourceRoute]
    );
  }
}

export default new Utils();
