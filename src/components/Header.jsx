import React, { memo } from "react";

const Header = ({ onGenerateComic, loading }) => {
  return (
    <div className="bg-gradient-to-r from-blue-300 border-l-blue-600 p-6 text-black-300">
      <h1 className="text-3xl font-bold mb-2">힘들면 힘을 빼자 🔥</h1>
      <h2 className="text-xl opacity-75">
        {new Date().toLocaleDateString("ko-KR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h2>
      <div className="flex flex-col items-end">
        <button
          onClick={onGenerateComic}
          disabled={loading}
          className={`px-4 py-2 rounded text-white w-40 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "생성 중..." : "하루 요약하기"}
        </button>
        {loading && (
          <p className="text-sm text-gray-600 mt-2">
            힘을 뺀 목록을 통해서 하루를 요약 중 입니다... 잠시만 기다려주세요!
            😊
          </p>
        )}
      </div>
    </div>
  );
};

export default memo(Header);
