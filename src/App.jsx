import { useState, useEffect, useRef } from 'react';
import { 
  Button, 
  Input, 
  Card, 
  Text, 
  Body1, 
  Subtitle1, 
  Title2,
  makeStyles,
  tokens,
  InfoLabel,
  Link,
  Caption1
} from '@fluentui/react-components';
import { 
  Search24Regular, 
  Checkmark24Regular, 
  Dismiss24Regular,
  Warning24Regular,
  People24Regular
} from '@fluentui/react-icons';
import { isInBlacklist, blacklistData } from './data/blacklist';
import { quotes, getRandomQuote } from './data/quotes';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    paddingTop: '60px',
    paddingBottom: 0,
    background: tokens.colorNeutralBackground1,
  },
  title: {
    marginBottom: '32px',
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  card: {
    width: '100%',
    maxWidth: '480px',
    padding: '32px',
    boxShadow: tokens.shadow8,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  inputContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
  },
  input: {
    flex: 1,
  },
  resultContainer: {
    marginTop: '24px',
    padding: '20px',
    borderRadius: tokens.borderRadiusMedium,
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
  },
  resultSafe: {
    backgroundColor: tokens.colorStatusSuccessBackground1,
    border: `1px solid ${tokens.colorStatusSuccessBorder1}`,
  },
  resultBlocked: {
    backgroundColor: tokens.colorStatusDangerBackground1,
    border: `1px solid ${tokens.colorStatusDangerBorder1}`,
  },
  resultInfo: {
    flex: 1,
  },
  iconSafe: {
    color: tokens.colorStatusSuccessForeground1,
    fontSize: '28px',
    marginTop: '2px',
  },
  iconBlocked: {
    color: tokens.colorStatusDangerForeground1,
    fontSize: '28px',
    marginTop: '2px',
  },
  label: {
    marginBottom: '12px',
  },
  footer: {
    marginTop: 'auto',
    padding: '24px',
    backgroundColor: tokens.colorNeutralBackground3,
    textAlign: 'center',
    width: '100%',
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  footerText: {
    color: tokens.colorNeutralForeground2,
  },
  resultTitle: {
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: '8px',
    display: 'block',
  },
  resultItem: {
    marginBottom: '4px',
    display: 'block',
  },
  stats: {
    marginBottom: '24px',
    padding: '16px 24px',
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  statsIcon: {
    color: tokens.colorBrandForeground1,
    fontSize: '24px',
  },
  statsText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  statsNumber: {
    fontSize: '28px',
    fontWeight: tokens.fontWeightBold,
    color: tokens.colorBrandForeground1,
  },
  statsLabel: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
  },
  quoteContainer: {
    marginTop: '24px',
    padding: '20px',
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    minHeight: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: '16px',
    lineHeight: '1.8',
    color: tokens.colorNeutralForeground1,
    fontFamily: 'Courier New, monospace',
    textAlign: 'center',
  },
  cursor: {
    display: 'inline-block',
    marginLeft: '2px',
    animation: 'blink 1s infinite',
  },
});

function App() {
  const styles = useStyles();
  const [qqInput, setQqInput] = useState('');
  const [result, setResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length));
  const [displayedQuote, setDisplayedQuote] = useState('');
  const timerRef = useRef(null);

  const handleSearch = () => {
    if (!qqInput.trim()) {
      setResult(null);
      setHasSearched(false);
      return;
    }

    const found = isInBlacklist(qqInput.trim());
    setResult(found);
    setHasSearched(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const isNumericInput = /^\d+$/.test(qqInput.trim());

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    const text = quotes[currentQuoteIndex];
    let i = 0;
    setDisplayedQuote('');
    timerRef.current = setInterval(() => {
      if (i < text.length) {
        setDisplayedQuote(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timerRef.current);
      }
    }, 100);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuoteIndex]);

  return (
    <div className={styles.container}>
      <Title2 className={styles.title}>MTR 黑名单查询器</Title2>
      
      <div className={styles.stats}>
        <People24Regular className={styles.statsIcon} />
        <div className={styles.statsText}>
          <Text className={styles.statsNumber}>{blacklistData.length}</Text>
          <Text className={styles.statsLabel}>人在黑名单中</Text>
        </div>
      </div>
      
      <Card className={styles.card}>
        <div className={styles.label}>
          <InfoLabel>输入 QQ 号或用户名</InfoLabel>
        </div>
        
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            placeholder="请输入 QQ 号或用户名"
            value={qqInput}
            onChange={(e, data) => setQqInput(data.value)}
            onKeyPress={handleKeyPress}
            size="large"
          />
          <Button 
            appearance="primary" 
            icon={<Search24Regular />}
            onClick={handleSearch}
            size="large"
          >
            查询
          </Button>
        </div>

        {hasSearched && result && (
          <div className={`${styles.resultContainer} ${styles.resultBlocked}`}>
            <Dismiss24Regular className={styles.iconBlocked} />
            <div className={styles.resultInfo}>
              <Subtitle1 className={styles.resultTitle} style={{ color: tokens.colorStatusDangerForeground1 }}>
                该用户在黑名单中
              </Subtitle1>
              <Body1 className={styles.resultItem}>
                <Text>昵称: {result.name}</Text>
              </Body1>
              <Body1 className={styles.resultItem}>
                <Text>QQ: {result.qq}</Text>
              </Body1>
              <Body1 className={styles.resultItem}>
                <Text>原因: {result.reason}</Text>
              </Body1>
            </div>
          </div>
        )}

        {hasSearched && !result && (
          <div className={`${styles.resultContainer} ${styles.resultSafe}`}>
            <Checkmark24Regular className={styles.iconSafe} />
            <div className={styles.resultInfo}>
              <Subtitle1 className={styles.resultTitle} style={{ color: tokens.colorStatusSuccessForeground1 }}>
                该用户不在黑名单中
              </Subtitle1>
              <Body1 className={styles.resultItem}>
                <Text>{isNumericInput ? `QQ: ${qqInput}` : `用户名: ${qqInput}`}</Text>
              </Body1>
              <Body1 className={styles.resultItem}>
                <Text>状态: 正常</Text>
              </Body1>
            </div>
          </div>
        )}
      </Card>

      <div className={styles.quoteContainer}>
        <Text className={styles.quoteText}>
          <span className={styles.cursor}></span>
          {displayedQuote}
        </Text>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <Button 
          appearance="subtle" 
          onClick={() => setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)}
          size="small"
        >
          下一句
        </Button>
      </div>

      <div className={styles.footer}>
        <Body1 className={styles.footerText}>
          <Text>
            如果想申请提交新的黑名单人物请给网站
            <Link 
              href="https://github.com/leonmmcoset/mtrblacklist" 
              target="_blank" 
              inline
              style={{ margin: '0 4px' }}
            >
              GitHub 仓库
            </Link>
            提交 PR，
            <Link 
              href="https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request" 
              target="_blank" 
              inline
              style={{ margin: '0 4px' }}
            >
              提交 PR 教程
            </Link>
          </Text>
        </Body1>
      </div>
    </div>
  );
}

export default App;
