import { Button, Heading, Html, Tailwind } from "@react-email/components";

const ConfirmationEmail = ({
  name,
  type,
  amount,
  currency,
}: {
  name: string;
  type: string;
  currency: string;
  amount: number;
}) => {
  return (
    <Html>
      <Tailwind>
        <div className="border-solid border-1 rounded-xl bg-gray-200 ml-64 mr-64">
          <div className="flex justify-center pl-5">
            <img
              src="https://i.imgur.com/U73FbAf.png"
              alt="clonify"
              width={50}
              height={50}
              title="logo"
              className="pr-1 pt-3"
            />
            <Heading as="h1" className="text-green-500">
              Payment Successful!
            </Heading>
          </div>
          <div className="pt-3 pl-8 text-xl justify-between text-left">
            <div className="flex flex-row gap-1">
              <div>Hello</div>
              <div className="font-bold pr-1 pl-1"> {name} </div>
              <div>thank you for choosing us.</div>
            </div>
            <div className="pt-3">Type - {type}</div>
            <div className="pt-3">Amount - {`${amount} ${currency}`} </div>
            <div className="pt-5 pb-5 flex justify-between">
              <Button
                href="http://localhost:3000/"
                className="rounded-xl bg-green-500 p-2 h-6 text-black active:text-black hover:text-black mr-1"
              >
                Start
              </Button>{" "}
              <p className="mt-15">listening to your favorite songs.</p>
            </div>
          </div>
        </div>
      </Tailwind>
    </Html>
  );
};

export default ConfirmationEmail;
