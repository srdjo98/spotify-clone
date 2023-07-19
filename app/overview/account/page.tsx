import OverviewLayout from "../OverviewLayout";

const AccountPage = () => {
  return (
    <OverviewLayout>
      <div className="p-10 text-black">
        <div className="text-3xl font-bold">Profile overview</div>
        <div className="pt-10 pb-7 font-bold text-2xl">Profile</div>
        <div className="grid grid-cols-2 gap-y-5 grid-flow-row text-xl text-gray-500">
          <div>
            Username <hr className="mt-2" />
          </div>
          <div>
            Srdjan <hr className="mt-2" />
          </div>
          <div>
            Email <hr className="mt-2" />
          </div>
          <div>
            zaricsrdjan@gmail.com <hr className="mt-2" />
          </div>
        </div>
        <div className="pt-10">
          <div className="text-2xl font-bold pb-7">Your Package</div>
          <div className="p-1 bg-gray-300 rounded-lg">
            <div className="p-8">
              <div className="text-xl font-bold pb-6">Clonify Free</div>
              <div>Play music with ads</div>
            </div>
            <div className="bg-gray-400 rounded-b-lg p-8 font-bold text-xl">
              Free
            </div>
          </div>
          <button className="rounded-2xl border-black border p-2 mt-10">
            Start using Premium
          </button>
        </div>
      </div>
    </OverviewLayout>
  );
};

export default AccountPage;
