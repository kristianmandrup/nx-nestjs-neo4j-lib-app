export const orderResolvers = {
    estimatedDelivery: (_obj, _args, _context, _info) => {
      const options = [1, 5, 10, 15, 30, 45];
      const estDate = new Date();
      estDate.setDate(
        estDate.getDate() + options[Math.floor(Math.random() * options.length)]
      );
      return estDate;
    }
  }
