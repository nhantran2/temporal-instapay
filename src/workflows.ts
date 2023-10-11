import { proxyActivities } from '@temporalio/workflow';
type InstapayInput = {
  userId: string;
  bsb: string;
};

const { requestInstapay,requestEmployeeDetail,createDeduction,deleteDeduction,transferMoney } = proxyActivities({
  startToCloseTimeout: '1 minute',
  retry:{
    nonRetryableErrorTypes:['NotRetryAble']
  }
});


export async function handleInstapay(
  input: InstapayInput,
): Promise<{transactionId?:string,success:boolean}> {
  try{
    await requestInstapay(input.userId);
    await requestEmployeeDetail(input.userId);
    await createDeduction(input.userId,200);
    await transferMoney(input.bsb,100);
    return {transactionId: '111',success:true}
  }catch(e){
    await deleteDeduction('111');
    return {success:false}
  }
}