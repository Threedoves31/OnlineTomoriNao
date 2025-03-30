// 封装 SiliconFlow API 请求
async function getAIResponse(userMessage, chatHistory = []) {
    const API_URL = "https://api.siliconflow.cn/v1/chat/completions";
    const API_KEY = "sk-hjfnoohleoaronmmtvseflopjkyddjaborvkxjmlisqwwwmy";
    const modelChosen = "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B";
    // 构造 messages 数组（含历史对话）
    const messages = [
        { role: "system", content: "你叫奈绪，是一个活泼可爱的二次元助手，用颜文字和可爱的语气回复用户。" },
        ...chatHistory.map(msg => ({
            role: msg.isMine ? "user" : "assistant",
            content: msg.text
        })),
        { role: "user", content: userMessage }
    ];

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: `${modelChosen}`,
            messages: messages,
            temperature: 0.7,
            max_tokens: 1024
        })
    });

    if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}
