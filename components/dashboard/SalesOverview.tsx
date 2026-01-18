export function SalesOverview() {
  const purchases = [
    { name: "Google", value: "500,000", color: "#09302C" },
    { name: "Apple", value: "500,000", color: "#0F524C" },
    { name: "Amazon", value: "500,000", color: "#008080" },
    { name: "Steam", value: "500,000", color: "#B8DAD7" },
  ];

  return (
    <div className="w-full lg:w-[591px] lg:h-[356px] rounded-3xl bg-white p-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium font-montserrat">Sales Overview</h3>
        <div className="flex items-center gap-[13px]">
          <span className="text-base font-normal font-montserrat text-[#333333CC]">
            This month
          </span>
          <div className="w-[10px] h-[10px] rounded-full bg-[#09302C]"></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-7 px-2">
        <div className="relative w-[250px] h-[250px] flex-shrink-0">
          <svg width="250" height="250" viewBox="0 0 250 250">
            <path
              d="M250 125C250 105.738 245.549 86.7375 236.994 69.4802C228.438 52.2228 216.011 37.176 200.681 25.5142C185.351 13.8524 167.533 5.89106 148.619 2.25163C129.704 -1.38781 110.204 -0.606892 91.6413 4.53343L97.5383 25.8292C112.82 21.5975 128.872 20.9547 144.443 23.9507C160.014 26.9468 174.682 33.5007 187.302 43.101C199.922 52.7013 210.153 65.0882 217.196 79.2948C224.238 93.5014 227.903 109.143 227.903 125H250Z"
              fill="#0F524C"
            />
            <path
              d="M185.078 234.616C205.291 223.537 222.047 207.086 233.495 187.08C244.942 167.074 250.635 144.293 249.944 121.253L227.857 121.916C228.425 140.882 223.739 159.636 214.315 176.106C204.891 192.575 191.098 206.118 174.458 215.238L185.078 234.616Z"
              fill="#B8DAD7"
            />
            <path
              d="M12.7075 179.913C20.2114 195.257 30.7806 208.902 43.7628 220.003C56.745 231.104 71.8647 239.426 88.1885 244.457C104.512 249.487 121.694 251.118 138.673 249.25C155.652 247.382 172.068 242.053 186.907 233.593L175.963 214.397C163.747 221.361 150.233 225.747 136.256 227.285C122.278 228.824 108.134 227.481 94.696 223.34C81.2578 219.198 68.8109 212.347 58.1237 203.208C47.4364 194.07 38.7356 182.838 32.5583 170.205L12.7075 179.913Z"
              fill="#008080"
            />
            <path
              d="M91.9986 4.43505C73.518 9.49362 56.4476 18.7329 42.1063 31.4392C27.7649 44.1454 16.5365 59.9785 9.28855 77.7152C2.04057 95.4519 -1.03299 114.617 0.305325 133.731C1.64365 152.845 7.35802 171.395 17.007 187.948L36.0977 176.821C28.1544 163.193 23.4502 147.922 22.3485 132.188C21.2467 116.453 23.777 100.675 29.7437 86.0741C35.7104 71.4728 44.9539 58.4387 56.76 47.9786C68.5661 37.5185 82.6189 29.9125 97.8325 25.7482L91.9986 4.43505Z"
              fill="#09302C"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-xl font-medium font-montserrat">200k</div>
            <div className="text-xl font-medium font-montserrat">Weekly</div>
            <div className="text-xl font-medium font-montserrat">Visits</div>
          </div>
        </div>

        <div className="flex-1 w-full space-y-6">
          <div>
            <p className="text-base font-medium font-montserrat text-[#333333CC] mb-1">
              Number of Purchases
            </p>
            <p className="text-[25px] font-semibold font-montserrat mb-2">
              500,000
            </p>
            <div className="h-px bg-[#33333399]"></div>
          </div>

          <div className="grid grid-cols-2 gap-x-[61px] gap-y-2">
            {purchases.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center gap-[13px]">
                  <div
                    className="w-[10px] h-[10px] rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-base font-normal font-montserrat text-[#333333CC]">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-[13px]">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#09302C] flex-shrink-0"></div>
                  <span className="text-base font-semibold font-montserrat">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
