exports.verifyEmail = (email) => {

    if (!/^[A-Z0-9._%+-]+@itapecerica+\.sp\.gov\.br$/i.test(email)){
        throw {status: 403, message: 'Email inválido'}
      } else {
        return true
      }
}