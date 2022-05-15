export class Utils {
  errorHandlerMessage(codeError: string, errorSourceRoute: string): string {
    const codeErrorMatrix = {
      P2025: 'Sorry, we dont found any user with that id',
    };

    const errorSourceRouteMatrix = {
      getAllUsers: 'Ocurred an error on trying to get all users',
      createUser: 'Ocurred an error on trying to create the user',
      getUserDetails: 'Ocurred an error on trying to get the user data',
      updateUser: 'Ocurred an error on trying to update the user',
      deleteUser: 'Ocurred an error on trying to delete the user',
    };

    return (
      codeErrorMatrix[codeError] || errorSourceRouteMatrix[errorSourceRoute]
    );
  }
}

export default new Utils();
