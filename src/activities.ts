import { Context } from '@temporalio/activity';
class NotRetryAble extends Error {}

export const requestInstapay = (userId: string, amount: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Instapay request for ${amount} sent!`);
    }, 1000);
  })
}


export const requestEmployeeDetail = (userId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Employee details for ${userId} sent!`);
    }, 1000);
  })
}

export const createDeduction = (userId: string, amount: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const info = Context.current().info.attempt
      if (info > 3) {
        reject(new NotRetryAble('NotRetryAble'))
      }

      if (info > 0) {
        reject(new Error('Lets retry'))
      }



    }, 1000);
  })
}

export const deleteDeduction = (deductionId: string): Promise<string> => {
  const attempt = Context.current().info.attempt;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (attempt < 2) {
        reject(new Error('Lets retry'))
      }

      resolve(`Deduction ${deductionId} deleted!`);
    }, 1000);
  })
}

export const transferMoney = (bsb: string, amount: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Transfer for ${amount} created!`);
    }, 1000);
  })
}
